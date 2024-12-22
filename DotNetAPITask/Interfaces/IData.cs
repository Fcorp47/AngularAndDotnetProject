using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetAPITask.Interfaces
{
    public interface IData
    {
        Task<string> GetJsonDataAsync();
        Task SaveJsonDataAsync(object data);
    }
}