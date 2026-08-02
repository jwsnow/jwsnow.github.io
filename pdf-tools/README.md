# PDF Submission Tools

This folder contains two client-side web pages:

- `compress-pdf.html` resizes PDF pages to US letter size and reduces the output to 10 MB or less.
- `images-to-pdf.html` combines multiple images into a letter-size PDF that is 10 MB or less.
- `index.html` is an optional landing page linking to both tools.

## Deployment

Upload the entire folder to the same directory on a web server. Keep `styles.css` and `common.js` beside the HTML files.

The pages load these pinned open-source libraries from jsDelivr:

- pdf-lib 1.17.1
- PDF.js 6.1.200
- heic2any 0.0.4

All selected files are processed in the browser. The files themselves are not sent to jsDelivr or to another server. Internet access is required to load the libraries unless you download and self-host those library files and change the `<script>` and module URLs.

## Important behavior

The PDF compression page rasterizes every input page. This makes it possible to control output dimensions and file size, but it removes searchable/selectable text, form fields, links, annotations, layers, and accessibility structure.

Portrait output pages are 8.5 x 11 inches. Landscape output pages are 11 x 8.5 inches. Content is fitted proportionally and is not cropped.

## Browser support

Use a current version of Chrome, Edge, Firefox, or Safari. HEIC support is supplied by heic2any rather than by the browser's native image decoder.

## Local testing

Because one page imports PDF.js as an ES module, test through a local web server rather than by double-clicking the files. For example, from this folder:

```text
python -m http.server 8000
```

Then open `http://localhost:8000/`.
