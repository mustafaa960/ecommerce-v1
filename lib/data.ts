export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  thumbnails?: string[];
  isNew?: boolean;
  discount?: number;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Bosch Angle Grinder",
    brand: "Bosch",
    description: "Professional GWS 750-100",
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.6,
    reviews: 135,
    discount: 25,
    category: "Power Tools",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdqMw-Buf03AqetXRv3OpejJjpJ38q08Dz5VJeR24fmJErt07vzrgAVnOUblnm-UBM_pEcUdlT-fcsGKHSe-qobQeQVbivHeH4OtcCG2lCZp961EpkT42UMitYM5nEz3g9PidThkCCwn813yr9F4pC0HPYRBqW-Hwv-Z4C-auHvsQIEU-AuWxiwXo6I5gZ-p5DqEEFdCrRv5MFyd3PgEveipIVsF9bHsYHPnwCsQVEHzt4QAFz_pSpuYZbKmvlf-qAatrYSNPzjb5G",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD_VRtTIizLH809tVFbPoAzGvClNLb3uaGbc-ItSY7roy5yAk2fLC9t1_Rq82rQITFlMc3QTIKOagL3vRvUqEUxwh4zlKAnrnFxwADpaiUymL1wC0iP58m3mlVM_L9gQ2HV24YDUlStM5l4D6GVVqxNpSbmuRudMbOD-_myqs01Lra-jSjFUQAt4NayvTCpC-OnmashMwmF2TlcQz_jSv4HE7OxcedqIhrUd9zh3zm6BsxrXS2DnFPIiaq0crsmNL6_xnzfG8V2AZC",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpnIQFpwWAb3sxCzNP95rlWOvqzig8yvwH0iLz1hltqF2d-lt2VY0GG48bavmGmpqRRb3_1uWU7Z3SEeXiqxpBhqTudBHtBvXo93HLwkDJ5xAzv5vwacxTMQPA8IjWOFVEkUt-NM5A-ckJHDShvhGSa6HllDivz2oRAM-vBgGXWD-tyJ9tWhlk5omj5nofSiOSUaD43k6gnbc2HR35ezc-xhb82xumBYEYcU3142oT3v5x_UPOS0ZLrXqUg-VjcK5FDSRC0tdjaa63",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrvw0MNVeWQpQMebfCA4ECzAxmVsB1zdSFYd1avfKD-dtBP3tuF6VgzjO8LQMJPUZ8iC0g6_fHouDEZAuGBibOm6bhLty4fm49YJXdDzkeJpY7xD43BImHRZxUvi1dS4Fn50UvftXIt55w2kM2s1AhL7O_2AHAKamc6vtjtP3M_GPyQNwse0WbkFFO96J4Ex6iVUpAuowWLuTEhQyJKOHOSTYoqbWqsZMO630MwaKakLY99og19iFXBLh7VhTznYdOmfpvnnLnoX_E",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHpxd2l_Lb26SI49mB9-iNtNqU63u_ov5aa9MiBfqAbAT798mgAZ2s379yVd9bk_yVyjpB4S8BRtwGVk3OWicSaheNYfBk6BtnNI4yM1g4DvQAOqJmlZuFejEiTfmjOhHZy2Ij5wf7y5ihbznyjJmJv8e5CCNKJOI5LIv7AztQaouEZ1YSa8NXVFbjn2ILbpnpZGy5oIlyrOGjQQhJEkUYFDhJItjERNc0iR1yWexpF5MUCgyGN0d59PVOXAqK9qvVXGRyfUDB2XbG"
    ]
  },
  {
    id: "2",
    name: "Makita Cordless Drill Kit",
    brand: "Makita",
    description: "18V LXT Lithium-Ion",
    price: 120.00,
    originalPrice: 158.40,
    rating: 4.8,
    reviews: 128,
    category: "Power Tools",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmwBMB68cXDshJZFWjP7gRP6sqZkg1TujXPgFwVWSgCRdYlwl0byLge2ellsbjkFIIn10SsSjLKiaWIyUZRe_YQQDZPG1MQOxxlceJ1wD27LB10N1AtOnbE1IvF0xvKvdNes4U4pZHVll879vPHdkxlSg6hjD7g9rVJDbGslkXNbvBLBMQ1RjiHTpjD279_oAWvC5HAvBzbvmrgM1mHGstPX9vOtSk7zWsVNKWrdcjStVV2eg4DT-Qphp_MvPZkgmY98hxLHR_sqCn"
  },
  {
    id: "3",
    name: "Dewalt Heavy Duty Tool Box",
    brand: "DeWalt",
    description: "ToughSystem 2.0 Large",
    price: 35.00,
    rating: 4.5,
    reviews: 85,
    category: "Storage",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBwj1n-wgEV0TJ25T8AE3TRPEAoaOxw96bEoDsoeqwBgW0w6mFbJc9xxw3kwk4C2nPqbxWtQYRty9kzamw9dd3E8BS44WvKtSdzJg08bKwMMbjIRlzpPz8o5tAHTRbeNaQ3dXlRJRJdmpZ3ALu2PPf5rE7h-hXsKxvr6QkcU_8NCnHAwa3sfwFktYJYfvpdtWAzRkuURgfy3WKMEB7TAHFUFhMPgof6BFXCospCAngLylTUnsK1aElDzhL9SeZPWyLI-szpkaj2CPP"
  },
  {
    id: "4",
    name: "Milwaukee Impact Driver",
    brand: "Milwaukee",
    description: "M18 Fuel Hex Hydraulic",
    price: 85.00,
    rating: 4.9,
    reviews: 15,
    isNew: true,
    category: "Power Tools",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSd-6n_qgvNQxo__Yu2AYPR25FOIBI-z9iFrxkk58eKKleJ0apSqKJ_1hoZ7U1TDXE2v1f4I4to6LsjWAD4mbxt2nWpsZ4ElIuPQBIICSCJ2aq7d8vsldDyWRMkNvAZwhAX5kROOUDVI3BWz7_cr7q3Q_6ILwIDw648LIeZHcCTN0Nw7sSCol6THdjOd7VrLxiYTtisbJb4GXZ6Zyws-hSiSWKf6i6T5-j38YBXMTb5zbGdK29jOTkBuP0bDLnb3TtyZuLpAWk2ZfR"
  },
  {
    id: "5",
    name: "Makita Impact Kit",
    brand: "Makita",
    description: "Complete Set with 2 Batteries",
    price: 120.00,
    originalPrice: 188.00,
    rating: 4.7,
    reviews: 89,
    category: "Power Tools",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMtYHYQt9IuZbl3L0fQBoWk3PXfJ9lfoS5mYjxIKiWqEsG6Ao5GrkQ1VmbNm70LFZ-YF9ygSbinj8ivDNYCO93oUVNlf27UGBFs3O-gL8-eu0riHW_oIDOvxhVY6e6DUbNz6ORp68y-5_BnaBLziXha_ZjgcIkAEhlYrxiPCoPtzJNFloLT9ozNRHN5gP7_40acNM_mE-qZOr5Ewt-e12CRZfhL90szqd_jlcV5KpZH4vVt8fEMKX2iD-SBlEWKjqJQyQSab-MndEF"
  },
  {
    id: "6",
    name: "Makita Tool Set",
    brand: "Makita",
    description: "General Purpose Kit",
    price: 120.00,
    originalPrice: 188.09,
    rating: 4.2,
    reviews: 5,
    category: "Hand Tools",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnwZ3nrPj8XzuxTDY-PSSd7etiOS1qzCxPpM9sBq1JhvkW8l58pC9cG-xd7FfiKwRcZMgsPf85d_Llov3OHkU9Vl3wzPs72GxB7IihYFd4cOQSqpM-zoX9QoiN-OVGMSwi094OaI_tNj_j2a3a_woPfgOM6tbcVaGTCc2ZB1H3ltz6sVDAqB8g9VurZ8MS7I5okKfi10u6s8PaZAJw3b3HIV_5VYN38GJh82iuKYu7iTLOiGZDghnNByiUrKnjUgyzVzMViW97Foph"
  },
  {
    id: "7",
    name: "DeWalt Circular Saw",
    brand: "DeWalt",
    description: "20V Max XR Brushless",
    price: 35.00,
    rating: 4.6,
    reviews: 42,
    category: "Power Tools",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARVbbbFHyYL92QM5hGA3wXmuQ0jTkb5-jjiHxk1671gdER4YRCsh-JLNIbPYshKoXpdLmNzFKnJG2hv0wgeh1eDLNEfmwQMMxAi567zrN_O2J6dXqNMuBmODqBNzsP3bxMv1nH6vVsVKy1UlK-4uNmJE-dIAW14BIGJwpryWopMRk9GwQG0FVfQt0H1hCx_oW_zgg8w5FaBI6ux1d-2cGihSvgvIOEudvP3PL4EyAJ6LwZTEKvAXiO4IiGpxXti0M5riFCr46qbcA3"
  },
  {
    id: "8",
    name: "Milwaukee Impact Driver",
    brand: "Milwaukee",
    description: "Surge Hydraulic Driver",
    price: 85.00,
    rating: 4.9,
    reviews: 85,
    category: "Power Tools",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7l_dZlIemV7kj56XzXXDOA31Dq0SkRVO2CfvWgaP-oLhdAAnWw8M8PAHkMvKoCsqvDrYBBLW6kigdHGeZDhsVBUFkzhT0RVwaC5H2UPo2n9tjR6vdQfEn7vwqYS-hhBOrIt-HoXL5jI-Coeu9dvLVFy0AfGvucQ30dUWSL9T8MU9hKZjyqttxjQIyqYyIYsyR06yjXiibEAInRmUYl6rTo-Ta1U0-F7Kf1bKckCH21egpLpa6jhPADWBV_aCpJ2sqQhFtfC7lE6tE"
  }
];

export const categories = [
  { name: "Power Tools", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB243bUZWW3Wcs1fxrepbN8o_JYI9Hzg-FHDiP_2IejYO_ROjYLSZ_u5ohIbfLPYgs_KNt_KcEoA21Zc4LTrH39ZzrEO7Fvv9ybKdXIFV1O7RecsMksILDsiRwOfzenp7bpeCuE9wglxqEE5lTeWFH01Fwme9cDRyVZAsi3VnXTi93IWBERpcwQ-hGTllTfpzjKqdZRzufCzTp0MWPkHsQ1Wo8c8VL1S9YSC5lJgD6NSi-xQCbuZQQrOg7V3seQyZ11mdEcVBBoelj" },
  { name: "Hand Tools", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2KLGDenuyyKghc_bzn6sbSiim6V-GUq33yP6TkcMjOGR_h_m7rq_590gOh7UiS9pVCF9epC3wA6kgW0NLd-sxdmHJ_JMchCrp_wVJ6cpyu_rF8YYFZnS3BsuMYT75uYrQSWUbREYya86w86XLClxtprRsrX_1NgUtyphM3gkcOvkIo1z_uiALxoJhz8VXNiN7mQ38lSbK4f2whjXWYZlTTKDW8ebl7T2LwJXOG90T0qYmPYgAUOBSLfie_SnvGnruevvE63eS2Iar" },
  { name: "Measuring", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk42khSq1bM70T6HFkbTJRyA1kwnVQBbKeZxtarsL8PUiAlQhVSgg69rBgil4pqpsPXxtJtbvN36w6V1ya8L71DAQUrhjrnGuqxBe1sh0jHWgIc7IxadM43MeO2Us7J4UvkuiLLCA2chUhiblvpelYD_-o63oK29RNJ3q4oDxyGZMd6RQ6ZVqJRmgI9nrLTzmwcBZ1U0SmlIYIZE_752x5_Ts5vkJU0YMBAguTGGDjvfrDUhZQc6rpQ1phgbD-t-OcEEEr0-q2G5Le" },
  { name: "Storage", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0_XBFAJSzzkxTyOJg_WCY1jrmAOYPhzHjymTToigs5qtL8F5x4W4CW7KbwGjwFLBdA2tS4GfMuKcQsV77E1bxRr3S8KkDu4fa52A6HN-sXuKJMiSItWzuqbItmYugMKniSnXrCxJm30LvpNq-qQv4T2Ftm5ZWfn15ENPAdopGTh2kRvzookYFExnZVnWNWjVO08RHhccre6SzUG3ISqOpv9EMS3gNHPqRxrp082ydKRdsDkxp4PJyo9W6bHaRbrksOrZJeGthHR_F" },
  { name: "Safety Gear", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHLwaS8sUDYX69u1f1ar75HDrWHEWXgtSXNJr4Je377heUNu9sSHenULLQf05_vhoCHtlE6PQv-gPr7HDswbUKulYCDXkd4YlySd6I9uWG8FJp_64BrxNM6rtHrYU0i-xHdn_h1PtIY2vu30UD_7ugSp55jQwFXVaoUJumAor4zjzs9Q35YU20w7BGWfOBM_Nh_qvV90gOAEJusvR19g3TT8vAB6LSYo6zrRLm1Jb2zmvL7-T5RhDrrdJd4mOiY8nEoRAmrDLAAb5o" },
  { name: "Accessories", icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9E-jSUD2V0-ovKxrCTn-U1MELltsFx8nrL91V1hM75v6TAusvGC0yBvc03LeMRGcLbkq_s7NYQuc6vSYcfpnYhwwESxDScaLS2W7bbpJq4-vgEsWYBp4mx5YwLl1TYWyt3S3lXHfdXW7tnbPAU9TaMb-MRFj6pkpIC-WWfmwORHuyfrlliMeA_Y8VWYeXL6c_GAac8ggQu3uq9tEs4b-mtIl1FMLeIPBunIbGFI_5MDYJmNI70KLyPjxOLb9MktdFGbD-TD3TYZML" }
];
