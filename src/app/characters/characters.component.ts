import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: any[];
  loading: boolean = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters {
              results {
                id
                name
                status
                image
              }
            }
          }               
        `,
      })

      .valueChanges.subscribe((result: any) => {
        this.characters = result?.data?.characters?.results;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

}
