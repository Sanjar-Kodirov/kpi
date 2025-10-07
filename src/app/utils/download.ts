export type DownloadResponse = {
  data: Blob;
  headers?: Record<string, any>;
};

export const getFilenameFromDisposition = (contentDisposition?: string) => {
  if (!contentDisposition) return undefined;
  const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i.exec(contentDisposition);
  const raw = match && match[1] ? match[1].replace(/['"]/g, "") : undefined;
  return raw ? decodeURIComponent(raw) : undefined;
};

export const triggerBlobDownload = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadBlobResponse = async (
  response: DownloadResponse,
  fallbackName = `export_${new Date().toISOString().slice(0, 10)}`,
) => {
  const headers = response.headers || {};
  const contentType = headers["content-type"] || "application/octet-stream";
  const blob = response.data;

  if (contentType.includes("application/json")) {
    try {
      const text = await blob.text();
      const json = JSON.parse(text);
      throw new Error(json?.message || json?.title || "Export failed");
    } catch (e) {
      throw e instanceof Error ? e : new Error("Export failed");
    }
  }

  const disposition = headers["content-disposition"] || "";
  const filename = getFilenameFromDisposition(disposition) || fallbackName;
  const typedBlob = new Blob([blob], { type: contentType });
  triggerBlobDownload(typedBlob, filename);
};
