import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";

// Declare native methods in window object
declare function unescape(s:string): string;

export class TranslatePropsLoader implements TranslateLoader {
  private http;
  prefix: string;
  suffix: string;
  constructor(http: HttpClient, prefix?: string, suffix?: string) {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }

  /**
	 * Gets the translations from file
	 * @param lang
	 * @returns {any}
	 */
  public getTranslation(lang: string): Observable<any> {
    return this.http
      .get(`${this.prefix}/${lang}${this.suffix}`, { responseType: "text" })
      .map()
      .pipe(map((contents: string) => this.parse(contents)));
  }

  /**
	 * Parse properties file
	 * @param contents
	 * @returns {any}
	 */
  public parse(contents: string): any {
    let translations: { [key: string]: string } = {};

    // let input = JSON.stringify(contents).replace(/['"]+/g, '');
    // var ptrn = /[\\r\\t\\n\\s]*([a-zA-Z0-9_]*)\s*\t*\r*=\s*\t*\r*([a-zA-Z0-9_\s\t]*)\t*\r*\n*/g;

    // var match;
    // while ((match = ptrn.exec(input)) != null) {
    //     translations[match[1].trim()] = match[2].trim();
    // }

    // console.log(translations);

    var data = contents;
    var parsed = "";
    var parameters = data.split(/\n/);
    var regPlaceHolder = /(\{\d+\})/g;
    var regRepPlaceHolder = /\{(\d+)\}/g;
    var unicodeRE = /(\\u.{4})/gi;
    for (var i = 0; i < parameters.length; i++) {
      parameters[i] = parameters[i].replace(/^\s\s*/, "").replace(/\s\s*$/, ""); // trim
      if (parameters[i].length > 0 && parameters[i].match("^#") == null) {
        // skip comments
        var pair = parameters[i].split("=");
        if (pair.length > 0) {
          /** Process key & value */
          var name = unescape(pair[0])
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, ""); // trim
          var value = pair.length == 1 ? "" : pair[1];
          // process multi-line values
          // *** Altered Cometd implementation - while (value.match(/\\$/) == "\\") {
          while (value.match(/\\$/)) {
            value = value.substring(0, value.length - 1);
            value += parameters[++i].replace(/\s\s*$/, ""); // right trim
          }
          for (var s = 2; s < pair.length; s++) {
            value += "=" + pair[s];
          }
          value = value.replace(/"/g, '\\"'); // escape quotation mark (")
          value = value.replace(/^\s\s*/, "").replace(/\s\s*$/, ""); // trim

          /** Mode: bundle keys in a map */

            // handle unicode chars possibly left out
            var unicodeMatches = value.match(unicodeRE);
            if (unicodeMatches) {
              for (var u = 0; u < unicodeMatches.length; u++) {
                value = value.replace(
                  unicodeMatches[u],
                  this.unescapeUnicode(unicodeMatches[u])
                );
              }
            }
            // add to map
            translations[name] = value;
          
        } // END: if(pair.length > 0)
      } // END: skip comments
    }

    return translations;
  }

  /** Unescape unicode chars ('\u00e3') */
  unescapeUnicode(str) {
    // unescape unicode codes
    var codes = [];
    var code = parseInt(str.substr(2), 16);
    if (code >= 0 && code < Math.pow(2, 16)) {
      codes.push(code);
    }
    // convert codes to text
    var unescaped = "";
    for (var i = 0; i < codes.length; ++i) {
      unescaped += String.fromCharCode(codes[i]);
    }
    return unescaped;
  }
}
