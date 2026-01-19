import { useRef, useEffect } from 'react';
import { useSampleParamsStore } from '../../../../stores';
import { palette } from '../../../../theme';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

export function useDrawLoop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);

  const contextRef = useRef<CanvasRenderingContext2D>(null);
  const frontContextRef = useRef<CanvasRenderingContext2D>(null);

  const store = useSampleParamsStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!contextRef.current) {
      contextRef.current = canvasRef.current.getContext('2d')!;
    }

    const context = contextRef.current;
    const leftChannelData = store.audioBuffer!.getChannelData(0);

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawSampleVisualization(context, leftChannelData);
  }, [canvasRef.current, store.audioBuffer]);

  useEffect(() => {
    if (!frontCanvasRef.current) return;
    if (!frontContextRef.current) {
      frontContextRef.current = frontCanvasRef.current.getContext('2d')!;
    }

    const context = frontContextRef.current;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawLoopAreaVisualization(context, store.loopStart, store.loopEnd, store.duration);
  }, [frontCanvasRef.current, store.audioBuffer, store.loopStart, store.loopEnd]);

  return { canvasRef, frontCanvasRef };
}


function drawSampleVisualization(context: CanvasRenderingContext2D, channelData: Float32Array) {
  const lineWidth = 1;
  const lineColor = palette.frost.deepBlue;
  const nrOfLinesPerPixel = 8; // This is our resolution, tweak for performance vs accuracy
  const nrOfLines = (nrOfLinesPerPixel * CANVAS_WIDTH) / lineWidth;
  const lineGap = CANVAS_WIDTH / nrOfLines;

  const sizeOfABucket = Math.floor(channelData.length / nrOfLines); // Nr of data points to calculate each line
  const nrOfBuckets = Math.floor(channelData.length / sizeOfABucket);

  let drawData = new Float64Array(nrOfLines);
  let maxDataValue = Number.MIN_VALUE;

  for (let bucketIndex = 0; bucketIndex < nrOfBuckets; bucketIndex++) {
    for (let bucketDataIndex = 0; bucketDataIndex < sizeOfABucket; bucketDataIndex++) {
      const dataIndex = bucketIndex * sizeOfABucket + bucketDataIndex;
      // Add upp every value in the bucket
      drawData[bucketIndex] += Math.abs(channelData[dataIndex]);

      // Save the greatest value
      if (channelData[dataIndex] > maxDataValue) {
        maxDataValue = channelData[dataIndex];
      }
    }

    // Get mean value of each bucket
    drawData[bucketIndex] /= sizeOfABucket;
  }

  // Because we have so much zero or near zero values in the audio data, the resulting averages of the data points are very small.
  // To make sure this visualization works for all audio files, we need to normalize the data.
  // Normalize the data --> change the scale of the data so that the loudest sample measure as maxDataValue.
  // 1 is max gain and all drawData values will be lower than 1. So it means that multiplier is difference 1 and max value in drawData.
  const multiplier = 1 / Math.max(...drawData);
  drawData = drawData.map((n) => n * multiplier);

  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;
  context.globalCompositeOperation = 'multiply'; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

  // Save current state of canvas before we translate, scale and draw, and restore once we're done
  context.save();

  // Draw in the vertical middle of the canvas and scale all values (-1 to 1) to fit the canvas height
  context.translate(0, CANVAS_HEIGHT / 2);
  context.scale(1, CANVAS_HEIGHT / 2);

  // Draw all our lines
  context.beginPath();
  for (let i = 0; i < drawData.length; i++) {
    const x = i * lineGap;
    const y = drawData[i];
    context.moveTo(x, y);
    context.lineTo(x, y * -1);
  }
  context.stroke();

  // Draw a line through the middle
  context.lineWidth = 0.5 / CANVAS_HEIGHT;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(CANVAS_WIDTH, 0);
  context.stroke();

  context.restore();
}


function drawLoopAreaVisualization(context: CanvasRenderingContext2D, loopStart: number, loopEnd: number, duration: number) {
  const leftBorder = Math.floor(CANVAS_WIDTH * loopStart / duration);
  const rightBorder = Math.floor(CANVAS_WIDTH * loopEnd / duration) + 1;

  context.fillStyle = palette.frost.paleBlue;
  context.fillRect(0, 0, leftBorder, CANVAS_HEIGHT);
  context.fillRect(rightBorder, 0, CANVAS_WIDTH - rightBorder + 1, CANVAS_HEIGHT);
}
