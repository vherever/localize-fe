import { Component, Input, OnChanges, OnInit } from '@angular/core';

const jsonDataPreview: { lang: string, data: {} } = {
  lang: 'en',
  data: {
    key1: 'Value 1',
    key2: 'Value 2',
    key3: 'Value 3',
  },
};

@Component({
  selector: 'app-asset-preview',
  templateUrl: 'asset-preview.component.html',
})
export class AssetPreviewComponent implements OnInit, OnChanges {
  @Input() fileType: string;
  @Input() assetType: string;

  public dataPreview;

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('fileType', this.fileType);
    console.log('assetType', this.assetType);
    this.preparePreview(this.assetType);
  }

  private preparePreview(assetType: string): void {
    this.dataPreview = this.syntaxHighlightAndFormatData(
      this.preparePreviewDataToFormat(
        jsonDataPreview,
        assetType,
      ),
      assetType,
    );
  }

  private preparePreviewDataToFormat(jsonData: any, assetType: string): any {
    switch (assetType) {
      case 'key_value_pairs':
        return jsonData.data;
      case 'multi_language_nesting':
        const result = {};
        result[jsonData.lang] = jsonData.data;
        return result;
      case 'php_array':
      case 'php_lang_array':
      case 'php_constant_definitions':
        return jsonData.data;
    }
  }

  private syntaxHighlightAndFormatData(jsonData: string, assetType: string) {
    let result;
    switch (assetType) {
      case 'key_value_pairs':
      case 'multi_language_nesting':
        let jsonString = JSON.stringify(jsonData, undefined, 2);
        jsonString = jsonString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
          let cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'text-red-400';
              match = match.replace(':', '<span class="text-blue-300">:</span>');
            } else {
              cls = 'text-green-400';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return `<span class="${cls}">${match}</span>`;
        });
      case 'php_array':
        result = Object.keys(jsonData).reduce((acc, key, index: number) => {
          const lastComma = Object.keys(jsonData).length - 1 !== index ? ',' : '';
          acc += `<span class="block ml-8"><span class="text-red-400">'${key}'</span> <span class="text-blue-300">=></span> <span class="text-green-400">'${jsonData[key]}'</span>${lastComma}</span>`;
          return acc;
        }, '');
        return `<span><span class="text-yellow-500 block">&#60;?php</span> </span><span class="text-yellow-500 ml-4">return</span> <span class="text-yellow-500">array</span>(${result}<span class="ml-2">)</span>;`;
      case 'php_lang_array':
        result = Object.keys(jsonData).reduce((acc, key) => {
          acc += `<span class="block ml-4"><span class="text-yellow-500">$lang</span>[<span class="text-red-500">'${key}'</span>] = <span class="text-green-400">'${jsonData[key]}'</span>;</span>`;
          return acc;
        }, '');
        return `<span class="text-yellow-500 block">&#60;?php</span>${result}`;
      case 'php_constant_definitions':
        result = Object.keys(jsonData).reduce((acc, key) => {
          acc += `<span class="block ml-4"><span class="text-yellow-500">define</span>(<span class="text-red-500">'${key}'</span>, <span class="text-green-400">'${jsonData[key]}'</span>);</span>`;
          return acc;
        }, '');
        return `<span class="text-yellow-500 block">&#60;?php</span>${result}`;
    }
  }
}
