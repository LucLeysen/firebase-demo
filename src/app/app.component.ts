import { Subscription } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$: FirebaseListObservable<any[]>;
  course$;
  author$;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses');
    this.course$ = db.object('/courses/1');
    this.author$ = db.object('/authors/1');
  }

  add(course: HTMLInputElement) {
    this.courses$.push({
      name: course.value,
      price: 100,
      isLive: true,
      sections: [
        { title: 'Components' },
        { title: 'Directives' },
        { title: 'Template' }
      ]
    });
    course.value = '';
  }

  update(course) {
    this.db.object('/courses/' + course.$key)
      .update({
        title: 'new title',
        isLive: true
      });
  }

  delete(course) {
    this.db.object('/courses/' + course.$key)
      .remove()
      .then(x => console.log('DELETED'))
      .catch(err => console.log(err));
  }
}
