using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicles.Models
{
    public class Persoana
    {

        public int PersoanaId { get; set; }

        public string Nume { get; set; }

        public string PreNume { get; set; }

        public string CarteIdentitate { get; set; }

        public string Adresa { get; set; }

        public long Cnp { get; set; }
    }
}
