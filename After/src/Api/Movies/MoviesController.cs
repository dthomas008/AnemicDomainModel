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
    //private readonly MovieRepository _movieRepository;


    public MoviesController()
        : base()
    {
      
    }
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
      IEnumerable<Movie> customers = await DocumentDBRepository<Movie>.GetAllItemsAsync();

      List<MovieDto> dtos = customers.Select(x => new MovieDto
      {
        Id = x.Id,
        Name = x.Name
      }).ToList();

      return Ok(dtos);
    }
  }
}
