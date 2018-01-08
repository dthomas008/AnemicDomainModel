using Api.Utils;
using Logic.Customers;
using Logic.Movies;
using Logic.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Movies
{
  [Route("api/[controller]")]
  public class MoviesController: BaseController
    {
    private readonly MovieRepository _movieRepository;


    public MoviesController(UnitOfWork unitOfWork, MovieRepository movieRepository)
        : base()
    {
      _movieRepository = movieRepository;
    }
    [HttpGet]
    public IActionResult GetList()
    {
      IReadOnlyList<Movie> customers = _movieRepository.GetList();

      List<MovieDto> dtos = customers.Select(x => new MovieDto
      {
        Id = x.Id,
        Name = x.Name
      }).ToList();

      return Ok(dtos);
    }
  }
}
