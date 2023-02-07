import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var require: any;

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  // accessToken =
  //   'grG-786_nYcAAAAAAAAAASZmkKtn8u4U73zIEwMUfUMsl4vqhoEXmrSL68uswJ4I';
  dbx: any;

  accessTokenShortLived =
    'sl.BYWWATTBlqnaVr8n8pjldApNb6-ybZQr4EKvPixheMcBvhCfaBUA4ZbqBF0_xgqorzQDcYNa9JDSJZjIpfnikq9by3KySydY6jq9Lr2rlADyxl7zmdoCoEJLcrvtuGh4TYOkzEmj';
  refreshToken =
    '_JHRJ0QLIk4AAAAAAAAAAdqPZOJxjkgOMnnVi_QDifSz1UA9LBJokXj6HERHwsei';

  clientId = 'wz1dvqojdo5y8bt';
  clientSecret = '6urbz1oiuhtzbpy';

  constructor() {
    let fetch = require('isomorphic-fetch');
    let Dropbox = require('dropbox').Dropbox;
    this.dbx = new Dropbox({
      fetch: fetch,
      // accessToken: this.accessTokenShortLived,
      refreshToken: this.refreshToken,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });
  }

  checkAccount(): Observable<any> {
    return new Observable((observer: any) => {
      this.dbx
        .usersGetCurrentAccount()
        .then((response: any) => {
          console.log(response);
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  getTempLink(path?: string): Observable<any> {
    return new Observable((observer: any) => {
      this.dbx
        .filesGetTemporaryLink({
          path,
        })
        .then((response: any) => {
          console.log('YES CONGRATS: ', path);
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          console.log(error);
          console.error(observer.error(error));
          console.log(path);
        });
    });
  }

  downloadFile(path: string): Observable<any> {
    return new Observable((observer: any) => {
      this.dbx
        .filesGetTemporaryLink({ path })
        .then((response: any) => {
          var link = document.createElement('a');
          link.href = response.result.link;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          console.error(error);
          console.error(observer.error(error));
        });
    });
  }

  getThumbnail(path: String): Observable<any> {
    let format = 'jpeg';
    return new Observable((observer: any) => {
      this.dbx
        .filesGetThumbnail({
          path: path,
          format: format,
          size: 'w256h256',
          mode: 'strict',
        })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  getPreview(path: string): Observable<any> {
    return new Observable((observer: any) => {
      this.dbx
        .filesGetPreview({ path })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  getMetaData(path: string): Observable<any> {
    return new Observable((observer: any) => {
      this.dbx
        .filesGetMetadata({ path })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  uploadFile(path: string, filename: string, file: any): Observable<any> {
    // console.log(filename);
    // console.log(file);
    return new Observable((observer: any) => {
      this.dbx
        .filesUpload({
          path: path + filename,
          autorename: true,
          mode: 'overwrite',
          contents: file,
        })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          console.error(error);
          observer.error(error);
        });
    });
  }
}
