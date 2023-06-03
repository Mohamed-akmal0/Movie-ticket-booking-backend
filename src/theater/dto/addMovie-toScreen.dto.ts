export interface addMovieToScreen {
  movieId: string;
  screenId :string;
  theaterId: string;
  addedMovie:{
    price : number;
    time : string;
    screenType : string;
  }
}
