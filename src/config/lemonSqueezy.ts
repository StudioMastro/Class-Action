// Configurazione per l'ambiente di sviluppo e produzione
const PRODUCTION_CONFIG = {
  API_KEY: '__PRODUCTION_API_KEY__',
  STORE_ID: '__PRODUCTION_STORE_ID__',
  PRODUCT_ID: '__PRODUCTION_PRODUCT_ID__',
  CHECKOUT_URL: '__PRODUCTION_CHECKOUT_URL__'
};

// Valori di default per lo sviluppo
const DEV_CONFIG = {
  API_KEY: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI2MGQwOTM3MWY0NWVjNzA3MDhmZmUxMWEwYzdmNTVhOWQ4ZGY4OGZmOWM0NTk4YWMyOWQ1MjQ4ODdlZDgyMGU0ODY4MjQ1OTY2MjI4MzJiOCIsImlhdCI6MTc0MDA0NzM3MS41ODg0NDEsIm5iZiI6MTc0MDA0NzM3MS41ODg0NDUsImV4cCI6MjA1NTU4MDE3MS41MzczODQsInN1YiI6IjcwMjQxNSIsInNjb3BlcyI6W119.lgPrvr89MEdaE6Hp1fCFURpdkCooyw5PhuSJIkKWj-hucz3l6N5v4SkJqwRd_LCaazMKs5hlOmpQiWQKjZCW4KlllYQdv3RahYgPRNkG7_glMdQ2pD2uYmt9srEF6mS171sVpVOLDsqegL8igneTcnr5qVKdpRc59cRrXSzcDKlX-AZIx7gxRqt2kPgh0DDrgu5Ok1fiuF7MuAHgrPT6DcD9KUbN9Bo0fnzHORvefb31436Ux0e6Tvh4G-UnXe4ifAkL5uA-3C_0CFOLDCgzMBTrp1wb9vMGSTbreFSa6yh6GlUjPJ8R_wpYF7rXBmIp2t1jOyTCt1ujA8nPdiPRqoyULFbaQKGGJrf-jjKucIj23-WPvmp8XYCJl_V7c62Y2f1MdpPM8V3w9vLq_ueX5dtdd5CXOMjRuIuFj9p9oeUbBXApsKe836v0HncLE3Uz332INpQWxx8I_lG78pzyZoEeJ6OcpxMgAzixM8moF3yFukdiKAP9WImNHrk4Y_-H',
  STORE_ID: '155794',
  PRODUCT_ID: '53124',
  CHECKOUT_URL: 'https://mastro.lemonsqueezy.com/checkout'
};

// Determina se siamo in produzione basandoci sul valore di API_KEY
const isProduction = PRODUCTION_CONFIG.API_KEY !== '__PRODUCTION_API_KEY__';

export const LEMONSQUEEZY_CONFIG = {
  API_ENDPOINT: 'https://api.lemonsqueezy.com/v1',
  LICENSE_API_ENDPOINT: 'https://api.lemonsqueezy.com/v1/licenses',
  ...(!isProduction ? DEV_CONFIG : PRODUCTION_CONFIG)
};

// License status types from LemonSqueezy
export type LemonSqueezyLicenseStatus = 'active' | 'inactive' | 'expired' | 'disabled';

// API Response interfaces
export interface LemonSqueezyResponse {
  success: boolean;
  error?: string;
  license?: {
    status: LemonSqueezyLicenseStatus;
    key: string;
    expires_at?: string;
    activation_limit: number;
    activations_count: number;
  };
}