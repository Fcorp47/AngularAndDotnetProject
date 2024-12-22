using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using DotNetAPITask.Interfaces;

namespace DotNetAPITask.Repository
{
    public class DataProvider : IData
    {
        private readonly string _jsonFilePath;

        public DataProvider(string jsonFilePath)
        {
            _jsonFilePath = jsonFilePath;
        }

        public async Task<string> GetJsonDataAsync()
        {
            if(!File.Exists(_jsonFilePath))
            {
                throw new FileNotFoundException("File not found", _jsonFilePath);
            }
            return await File.ReadAllTextAsync(_jsonFilePath);
        }

        public async Task SaveJsonDataAsync(object data)
        {
            if(data == null)
            {}
            var jsonString = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_jsonFilePath, jsonString);
        }
    }
}