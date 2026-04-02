function encodeAngleBrackets(input = "") {
  return String(input).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function encodeForJsLevel5(input = "") {
  return String(input)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "\\'");
}

// lọc chưa đủ Filter kiểu blacklist, nhưng còn nhiều thẻ chưa lọc
function stripMostTagsAndAttrs(input = "") {
  let out = String(input);
  out = out.replace(
    /<\/?(script|xss|iframe|body|input|object|embed|link|meta|style)[^>]*>/gi,
    "",
  );
  out = out.replace(
    /\s(srcdoc|onfocus|xlink:href|formaction|data)\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi,
    "",
  );

  return out;
}
// lọc chưa đủ Filter kiểu blacklist nhưng lọt thẻ xss
function allowMostlyCustomTags(input = "") {
  let out = String(input);
  // Xóa một số tag phổ biến (không đầy đủ)
  out = out.replace(
    /<\/?(script|svg|img|iframe|body|input|object|embed|link|meta|style)[^>]*>/gi,
    "",
  );
  // Xóa một số event/attr nguy hiểm (không đầy đủ)
  out = out.replace(
    /\s(onerror|onload|onclick|onmouseover|src|href|data)\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi,
    "",
  );
  return out;
}

function renderLevel(level, payload = "") {
  const cleanPayload = String(payload || "");

  switch (level.id) {
    case 1: {
      const reflected = encodeAngleBrackets(cleanPayload);
      return `
        <div class="preview-card">
          <label class="preview-label">Search preview</label>
          <input class="demo-input" type="text" value="${reflected}" placeholder="Payload appears here">
        </div>
      `;
    }

    case 2: {
      const reflected = encodeAngleBrackets(cleanPayload);
      return `
        <div class="preview-card">
          <div class="output-title">JavaScript output</div>
          <div id="statusText" class="status-line">Preview loaded.</div>
        </div>
        <script>
          var searchTerm = '${reflected}';
          document.getElementById('statusText').innerHTML = 'Search term: ' + searchTerm;
        </script>
      `;
    }

    case 3: {
      return `
        <div class="preview-card">
          <div class="output-title">HTML output</div>
          <div class="html-output">${stripMostTagsAndAttrs(cleanPayload)}</div>
        </div>
      `;
    }

    case 4: {
      return `
        <div class="preview-card">
          <div class="output-title">Custom tag output</div>
          <div class="html-output">${allowMostlyCustomTags(cleanPayload)}</div>
        </div>
      `;
    }

    case 5: {
      const reflected = encodeForJsLevel5(cleanPayload);
      return `
        <div class="preview-card">
          <div class="output-title">JavaScript output</div>
          <div id="keywordText" class="status-line">Waiting...</div>
        </div>
        <script>
          var keyword = '${reflected}';
          document.getElementById('keywordText').innerHTML = 'Keyword: ' + keyword;
        </script>
      `;
    }

    default:
      return '<div class="preview-card">No output</div>';
  }
}

module.exports = {
  renderLevel,
};
