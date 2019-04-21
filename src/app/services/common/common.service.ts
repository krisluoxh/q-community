import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUsrInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=1';
  private apiUrlGetQuestion = 'https://imoocqa.gugujiankong.com/api/question/get';
  private apiUrlAnswer = 'https://imoocqa.gugujiankong.com/api/question/answer';

  login(mobile, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + '?mobile=' + mobile + '&password=' + password);
  }

  regster(mobile, userName, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + '?mobile=' + mobile + '&nickname=' + userName + '&password=' + password);
  }

  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    const body = res.json();
    console.log(res);
    console.log(body);

    return JSON.parse('') || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
