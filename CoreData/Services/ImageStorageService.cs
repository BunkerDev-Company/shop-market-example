using CoreData.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreData.Services
{
    public class ImageStorageService : IImageStorageService
    {
        private readonly string _imageRootPath;

        public ImageStorageService(IConfiguration configuration)
        {
            _imageRootPath = configuration["ImageRootPath"] ?? throw new ArgumentNullException("ImageRootPath not configured");
        }

        public FileStreamResult? GetImage(string relativePath)
        {
            var safePath = Path.GetFullPath(Path.Combine(_imageRootPath, relativePath));

            if (!File.Exists(safePath))
            {
                return null;
            }

            var stream = new FileStream(safePath, FileMode.Open, FileAccess.Read);
            var contentType = GetContentType(safePath);

            return new FileStreamResult(stream, contentType);
        }

        private string GetContentType(string path)
        {
            var ext = Path.GetExtension(path).ToLower();
            return ext switch
            {
                ".png" => "image/png",
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".gif" => "image/gif",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }
}
