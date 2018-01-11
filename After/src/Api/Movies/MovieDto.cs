namespace Api.Movies
{
    public class MovieDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
  public class CreateMovieDto
  {
    public int LicensingModel { get; set; }
    public string Name { get; set; }
  }
}
