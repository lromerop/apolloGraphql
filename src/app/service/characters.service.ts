import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CharactersService {

  private apollo: ApolloBase;

  constructor(private apolloProvider: Apollo) { 
    this.apollo = this.apolloProvider.use('rickApi');
  }

  getCharacters(page: number): Observable<any>{
    console.log(page);
    return this.apollo.watchQuery({
      query: CHARACTERS,
      variables: {
        charactersPage: page
      }

    }).valueChanges;
  }
 
}

const CHARACTERS = gql`
  query Characters ($charactersPage: Int) {
    characters (page: $charactersPage) {
      info {
        count
      }
      results {
        name
        status
        image
      }
    }
  }  
`;
