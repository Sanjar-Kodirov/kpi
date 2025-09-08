import { useEffect, useState } from "react";

export function useBlobFile(file, decode = false) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      let image = file;

      if (decode) {
        const byteCharacters = atob(image);

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        image = new Uint8Array(byteNumbers);
      }

      const url = URL.createObjectURL(new Blob([image]));

      setSrc(url);
    } else {
      setSrc(null);
    }
  }, [file]);

  return src;
}
