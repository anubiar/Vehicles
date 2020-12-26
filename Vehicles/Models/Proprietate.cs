using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicles.Models
{
    public class Proprietate
    {
        public int PropId { get; set; }

        public long Cnp { get; set; }

        public int NrVehicol { get; set; }

        public DateTime DataCumpararii { get; set; }

        public int Pret { get; set; }
    }
}
