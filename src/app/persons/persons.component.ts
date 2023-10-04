import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  personsRef: AngularFireList<any>;
  persons: Observable<any[]> | undefined;

  constructor(private db: AngularFireDatabase) {
    this.personsRef = db.list('testdata'); // assuming 'persons' is your Firebase DB path
  }

  ngOnInit(): void {
    this.persons = this.personsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
