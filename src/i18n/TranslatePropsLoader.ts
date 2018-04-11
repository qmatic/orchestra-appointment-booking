import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

// Declare native methods in window object
declare function unescape(s: string): string;

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
      .get(`${this.prefix}/${lang}${this.suffix}`, { responseType: 'text' })
      .pipe(map((contents: string) => this.parse(contents))).catch(err => {
        console.log(err);
        return of({});
      });
  }

  /**
	 * Parse properties file
	 * @param contents
	 * @returns {any}
	 */
  public parse(contents: string): any {
    const translations: { [key: string]: string } = {};
    const data = contents;
    const parsed = '';
    const parameters = data.split(/\n/);
    const regPlaceHolder = /(\{\d+\})/g;
    const regRepPlaceHolder = /\{(\d+)\}/g;
    const unicodeRE = /(\\u.{4})/gi;
    for (let i = 0; i < parameters.length; i++) {
      parameters[i] = parameters[i].replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim
      if (parameters[i].length > 0 && parameters[i].match('^#') == null) {
        // skip comments
        const pair = parameters[i].split('=');
        if (pair.length > 0) {
          /** Process key & value */
          const name = unescape(pair[0])
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, ''); // trim
          let value = pair.length === 1 ? '' : pair[1];
          // process multi-line values
          // *** Altered Cometd implementation - while (value.match(/\\$/) == '\\') {
          while (value.match(/\\$/)) {
            value = value.substring(0, value.length - 1);
            value += parameters[++i].replace(/\s\s*$/, ''); // right trim
          }
          for (let s = 2; s < pair.length; s++) {
            value += '=' + pair[s];
          }
          value = value.replace( /"/g, '\\"' ); // escape quotation mark (")
          value = value.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' ); // trim

          /** Mode: bundle keys in a map */

            // handle unicode chars possibly left out
            const unicodeMatches = value.match(unicodeRE);
            if (unicodeMatches) {
              for (let u = 0; u < unicodeMatches.length; u++) {
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
    const codes = [];
    const code = parseInt(str.substr(2), 16);
    if (code >= 0 && code < Math.pow(2, 16)) {
      codes.push(code);
    }
    // convert codes to text
    let unescaped = '';
    for (let i = 0; i < codes.length; ++i) {
      unescaped += String.fromCharCode(codes[i]);
    }
    return unescaped;
  }
}
