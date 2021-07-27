import { Component, OnInit } from '@angular/core';
import { CharacterModel } from 'src/app/models/characters.model';
import { CharactersService } from 'src/app/service/characters.service';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html'
})
export class CharactersComponent implements OnInit {
  characters: CharacterModel[];
  loading: boolean = true;
  error: any;
  page: number = 1;
  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.getData(1);
  }

  nextPage() {
    this.page++;
    this.getData(this.page);
  }

  prevPage(){
    this.page--;
    this.getData(this.page);
  }

  getData(page: number) {
    this.charactersService.getCharacters(page).subscribe((data) => {
      this.characters = data.data.characters.results;
      console.log("data in components", this.characters);
      this.loading = data.loading;
      this.error = data.error;
    });
  }
}
