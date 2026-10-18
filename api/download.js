const FILES = {
  "1": {
    url: "https://res.cloudinary.com/dkm8cbylh/image/upload/v1792315834/partie_1_1x1_qgnjkv.gif",
    filename: "partie-1.gif",
  },
  "2": {
    url: "https://res.cloudinary.com/dkm8cbylh/image/upload/v1792315836/partie_2_1x1_x9jvhp.gif",
    filename: "partie-2.gif",
  },
  "3": {
    url: "https://res.cloudinary.com/dkm8cbylh/image/upload/v1792315838/partie_3_1x1_pjbgoh.gif",
    filename: "partie-3.gif",
  },
  "4": {
    url: "https://res.cloudinary.com/dkm8cbylh/image/upload/v1792315836/partie_4_1x1_ipsbxt.gif",
    filename: "partie-4.gif",
  },
};

module.exports = async function handler(req, res) {
  const part = String(req.query.part || "");
  const file = FILES[part];

  if (!file) {
    res.status(400).send("Paramètre invalide.");
    return;
  }

  try {
    const upstream = await fetch(file.url);

    if (!upstream.ok || !upstream.body) {
      res.status(502).send("Impossible de récupérer le fichier.");
      return;
    }

    res.setHeader("Content-Type", "image/gif");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      res.setHeader("Content-Length", contentLength);
    }
    res.setHeader("Cache-Control", "public, max-age=3600");

    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (err) {
    res.status(500).send("Erreur serveur lors du téléchargement.");
  }
};
