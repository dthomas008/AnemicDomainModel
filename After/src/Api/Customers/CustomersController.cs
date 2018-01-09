using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Utils;
using CSharpFunctionalExtensions;
using Logic.Customers;
using Logic.Movies;
using Logic.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Api.Movies
{
  [Route("api/[controller]")]
  public class CustomersController : BaseController
  {
    private readonly MovieRepository _movieRepository;
    //private readonly CustomerRepository _customerRepository;

    public CustomersController() // UnitOfWork unitOfWork, MovieRepository movieRepository CustomerRepository customerRepository
        : base()
    {
      //_customerRepository = customerRepository;
      //_movieRepository = movieRepository;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> Get(string id)
    {
      //Customer customer = _customerRepository.GetById(id);
      Customer customer = await DocumentDBRepository<Customer>.GetItemAsync(id);
      if (customer == null)
        return NotFound();

      var dto = new CustomerDto
      {
        Id = customer.Id,
        Name = customer.Name.Value,
        Email = customer.Email.Value,
        MoneySpent = customer.MoneySpent,
        Status = customer.Status.Type.ToString(),
        StatusExpirationDate = customer.Status.ExpirationDate,
        PurchasedMovies = customer.PurchasedMovies.Select(x => new PurchasedMovieDto
        {
          Price = x.Price,
          ExpirationDate = x.ExpirationDate,
          PurchaseDate = x.PurchaseDate,
          Movie = new MovieDto
          {
            Id = x.Movie.Id,
            Name = x.Movie.Name
          }
        }).ToList()
      };

      return Ok(dto);
    }

    [HttpGet]
    public async Task<IActionResult> GetList()
    {
      // IReadOnlyList<Customer> customers = _customerRepository.GetList();
      IEnumerable<Customer> customers = await DocumentDBRepository<Customer>.GetCustomersAsync();

      List<CustomerInListDto> dtos = customers.Select(x => new CustomerInListDto
      {
        Id = x.Id,
        Name = x.Name.Value,
        Email = x.Email.Value,
        MoneySpent = x.MoneySpent,
        Status = x.Status.Type.ToString(),
        StatusExpirationDate = x.Status.ExpirationDate
      }).ToList();

      return Ok(dtos);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] CreateCustomerDto item)
    {
      Result<CustomerName> customerNameOrError = CustomerName.Create(item.Name);
      Result<Email> emailOrError = Email.Create(item.Email);

      Result result = Result.Combine(customerNameOrError, emailOrError);
      if (result.IsFailure)
        return Error(result.Error);

      if (await emailInUse(emailOrError))
        return Error("Email is already in use: " + item.Email);

      var customer = new Customer(customerNameOrError.Value, emailOrError.Value);
      //_customerRepository.Add(customer);
      await DocumentDBRepository<Customer>.CreateItemAsync(customer);

      return Ok();
    }
    [HttpPost]
    [Route("email")]
    public async Task<IActionResult> EmailInUse([FromBody] CreateCustomerDto item)
    {
      Result<Email> emailOrError = Email.Create(item.Email);
      if (emailOrError.IsFailure)
        return Error(emailOrError.Error);
      if (await emailInUse(emailOrError))
        return Error("Email is already in use: " + item.Email);
      return Ok();
    }
    private async Task<bool> emailInUse(Result<Email> email)
    {
      var custs = await DocumentDBRepository<Customer>.GetItemsAsync(cust => cust.Email == email.Value);
      if (custs.Count() > 0)
        return true;
      else
      {
        return false;
      }
    }

    [HttpPut]
    [Route("{id}")]
    public IActionResult Update(long id, [FromBody] UpdateCustomerDto item)
    {
      Result<CustomerName> customerNameOrError = CustomerName.Create(item.Name);
      if (customerNameOrError.IsFailure)
        return Error(customerNameOrError.Error);

      Customer customer;// = _customerRepository.GetById(id);
      //if (customer == null)
      //  return Error("Invalid customer id: " + id);

      //customer.Name = customerNameOrError.Value;

      return Ok();
    }

    [HttpPost]
    [Route("{id}/movies")]
    public IActionResult PurchaseMovie(long id, [FromBody] long movieId)
    {
      Movie movie = _movieRepository.GetById(movieId);
      if (movie == null)
        return Error("Invalid movie id: " + movieId);

      Customer customer;//= _customerRepository.GetById(id);
      //if (customer == null)
      //  return Error("Invalid customer id: " + id);

      //if (customer.HasPurchasedMovie(movie))
      //  return Error("The movie is already purchased: " + movie.Name);

     // customer.PurchaseMovie(movie);

      return Ok();
    }

    [HttpPost]
    [Route("{id}/promotion")]
    public IActionResult PromoteCustomer(long id)
    {
      Customer customer = null;// = _customerRepository.GetById(id);
      //if (customer == null)
      //  return Error("Invalid customer id: " + id);

      Result promotionCheck = customer.CanPromote();
      if (promotionCheck.IsFailure)
        return Error(promotionCheck.Error);

      customer.Promote();

      return Ok();
    }
  }
}
