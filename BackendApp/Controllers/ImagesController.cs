using CoreData.Services;
using CoreData.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageStorageService _imageStorage;

        public ImagesController(IImageStorageService imageStorage)
        {
            _imageStorage = imageStorage;
        }

        [HttpGet]
        public IActionResult GetImage([FromQuery] string path)
        {
            if (string.IsNullOrWhiteSpace(path))
                return BadRequest("Path is required.");

            var result = _imageStorage.GetImage(path);
            return result;
        }
    }
}
