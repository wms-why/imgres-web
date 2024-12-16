import ImageBlobReduce from "image-blob-reduce";

const handler = new ImageBlobReduce();

export async function resizeByAlgorithm(
  input: Blob,
  width: number,
  height: number
) {
  const blob = await handler.toBlob(input, {
    max: Math.max(width, height),
    alpha: true,
  });
  return URL.createObjectURL(blob);
}
