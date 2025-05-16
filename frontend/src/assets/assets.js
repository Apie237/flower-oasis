import fo_logo from './fs-logo.svg'
import search_icon from './search-icon.png'
import phone_icon from './phone-icon.png'
import cart_icon from './cart-icon.png'
import angelic from './angelic.jpg'
import babyPink from './baby pink.webp'
import beMyLady from './be my lady.jpg'
import fragrance from './fragrance.webp'
import cottonBreeze from './cotton breeze.webp'
import iLoveYou from './i love you.webp'
import passionOfLove from './passion of love.jpg'
import mySweetie from './my sweetie.webp'
import youreAStar from "./you're a star.webp"
import youreAGem from "./you're a gem.webp"
import adorable from './adorable.jpg'
import delightful from './delightful.webp'
import foreverRose from './forever rose letter box.webp'
import millionStars from './million stars.webp'
import simplyDelightful from './simply delightful.webp'
import bouquetsHero from './hero-bouquets.jpg'
import boxesBasketsHero from './hero-boxes.png'
import driedFlowersHero from './hero-dried-flowers.png'
import rosesHero from './hero-roses.jpg'
import valentinesDayHero from './hero-valentines.png'
import teddyBearsHero from './hero-teddy-bears.jpg'
import christmasGreetingCard from './greeting-card-christmas.jpg'
import mixedChocolateBox from './choco-cocktail.jpg'
import sweetDreamsChocolateBox from './choco-sweet-dreams.jpg'
import BrownTeddyBear from './teddy-bear-brown.jpg'
import whiteTeddyBear from './teddy-bear-white.jpg'
import redTeddyBear from './teddy-bear-red.jpg'
import birthdayTopper from './topper-birthday.jpg'
import fathersDayTopper from './topper-fathers-day.jpg'
import getWellSoonTopper from './topper-get-well.jpg'
import iLoveYouTopper from './topper-i-love-you.jpg'
import mothersDayTopper from './topper-mothers-day.jpg'
import babyPenguinToy from './toy-baby-penguin.jpg'
import babyRabbitToy from './toy-baby-rabbit.jpg'
import elephantCollctionToy from './toy-elephant-collection.jpg'
import ceramicVase from './vase1.jpg'
import transparentVase from './vase2.jpg'
import cylindricalVase from './vase3.jpg'
import flower_logo from './flower-oasis-logo.svg'
import birthdayBaloon from './baloon.webp'
import fathersDayBaloon from './baloon2.jpg'
import mothersDayBaloon from './baloon3.jpg'
import newYearBaloon from './baloon4.jpg'
import christmasBaloon from './baloon5.jpg'
import binIcon from './bin_icon.png'
import userIcon from './user-icon.png'
import hero_image from './hero_image.jpg'
import menuIcon from './menu-icon.png'
import paymentMethods from './payment-methods.jpg'





export const assets = {
    paymentMethods,
    menuIcon,
    flower_logo,
    fo_logo,
    search_icon,
    phone_icon,
    cart_icon,
    adorable,
    angelic,
    babyPink,
    beMyLady,
    delightful,
    fragrance,
    cottonBreeze,
    iLoveYou,
    passionOfLove,
    mySweetie,
    youreAStar,
    youreAGem,
    foreverRose,
    millionStars,
    simplyDelightful,
    christmasGreetingCard,
    mixedChocolateBox,
    sweetDreamsChocolateBox,
    BrownTeddyBear,
    whiteTeddyBear,
    redTeddyBear,
    birthdayTopper,
    fathersDayTopper,
    getWellSoonTopper,
    iLoveYouTopper,
    mothersDayTopper,
    babyPenguinToy,
    babyRabbitToy,
    elephantCollctionToy,
    ceramicVase,
    transparentVase,
    cylindricalVase,
    birthdayBaloon,
    fathersDayBaloon,
    mothersDayBaloon,
    newYearBaloon,
    christmasBaloon,
    binIcon,
    userIcon,
    hero_image
}

export const heroImages = {
    bouquets: bouquetsHero,
    'boxes&baskets': boxesBasketsHero,
    'dried-flowers': driedFlowersHero,
    roses: rosesHero,
    'valentines-day': valentinesDayHero,
    teddyBears: teddyBearsHero,
};

export const products = [
    {
        _id: 1,
        name: 'adorable',
        description: "The Adorable bouquet is the perfect gift to bring a smile to someone's face.",
        price: 350,
        image: [adorable],
        category: ["bouquets", "roses", "valentines-day"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 2,
        name: 'angelic',
        description: "The Angelic bouquet is a heavenly arrangement that will bring joy to anyone's day.",
        price: 350,
        image: [angelic],
        category: ["boxes-baskets", "roses"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 3,
        name: 'babyPink',
        description: "The Baby Pink bouquet is a sweet and delicate arrangement perfect for any occasion.",
        price: 350,
        image: [babyPink],
        category: ["dried-flowers"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 4,
        name: 'beMyLady',
        description: "The Be My Lady bouquet is a romantic arrangement that will make anyone feel special.",
        price: 350,
        image: [beMyLady],
        category: ["bouquets", "roses"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 5,
        name: 'delightful',
        description: "The Delightful - Lavender bouquet is a soothing and beautiful arrangement.",
        price: 350,
        image: [delightful],
        category: ["bouquets", "roses"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 6,
        name: 'simplyDelightful',
        description: "The Simply Delightful - Flower Box is a charming arrangement that will brighten anyone's day.",
        price: 350,
        image: [simplyDelightful],
        category: ["boxes-baskets", "roses"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 7,
        name: 'fragrance',
        description: "The Fragrance bouquet is a delightful arrangement that will fill any room with a lovely scent.",
        price: 350,
        image: [fragrance],
        category: ["bouquets"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 8,
        name: 'foreverRose',
        description: "The Forever Rose - Letter Box is a timeless gift that will last forever.",
        price: 350,
        image: [foreverRose],
        category: ["boxes-baskets"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 9,
        name: 'cottonBreeze',
        description: "The Cotton Breeze bouquet is a refreshing arrangement that will bring a touch of nature indoors.",
        price: 350,
        image: [cottonBreeze],
        category: ["dried-flowers"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 10,
        name: 'iLoveYou',
        description: "The I Love You bouquet is a romantic arrangement that will express your love perfectly.",
        price: 350,
        image: [iLoveYou],
        category: ["boxes-baskets"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 11,
        name: 'millionStars',
        description: "The Million Stars bouquet is a stunning arrangement that will leave a lasting impression.",
        price: 450,
        image: [millionStars],
        category: ["dried-flowers"],
        sizes: ['small', 'medium', 'large'],
        date: '1234559',
        bestseller: true
    },
    {
        _id: 12,
        name: 'passionOfLove',
        description: "The Passion of Love bouquet is a passionate arrangement that will convey your deepest feelings.",
        price: 350,
        image: [passionOfLove],
        category: ["boxes-baskets"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 13,
        name: 'mySweetie',
        description: "The My Sweetie - Small Roses bouquet is a sweet and charming arrangement perfect for any occasion.",
        price: 350,
        image: [mySweetie],
        category: ["bouquets"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 14,
        name: "you'reAStar",
        description: "The You're a Star bouquet is a dazzling arrangement that will make anyone feel special.",
        price: 350,
        image: [youreAStar],
        category: ["bouquets", "lilies"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 15,
        name: "you'reAGem",
        description: "The You're a Gem bouquet is a precious arrangement that will make anyone feel treasured.",
        price: 350,
        image: [youreAGem],
        category: ["bouquets", "lilies"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 16,
        name: 'christmas Greeting Card',
        description: "The Christmas Greeting Card is a festive card that will spread holiday cheer.",
        price: 25,
        image: [christmasGreetingCard],
        category: ["add-ons", "greeting-card"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 17,
        name: 'mixed Chocolate Box',
        description: "The Mixed Chocolate Box is a delightful assortment of chocolates that will satisfy any sweet tooth.",
        price: 50,
        image: [mixedChocolateBox],
        category: ["add-ons", "chocolates"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 18,
        name: 'sweet Dreams Chocolate Box',
        description: "The Sweet Dreams Chocolate Box is a heavenly assortment of chocolates that will make any dream sweeter.",
        price: 50,
        image: [sweetDreamsChocolateBox],
        category: ["add-ons", "chocolates"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 19,
        name: 'Brown Teddy Bear',
        description: "The Brown Teddy Bear is a cuddly companion that will bring comfort and joy to anyone.",
        price: 50,
        image: [BrownTeddyBear],
        category: ["add-ons", "teddy-bear"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 20,
        name: 'white Teddy Bear',
        description: "The White Teddy Bear is a soft and sweet companion that will brighten anyone's day.",
        price: 50,
        image: [whiteTeddyBear],
        category: ["add-ons", "teddy-bear"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 21,
        name: 'red Teddy Bear',
        description: "The Red Teddy Bear is a charming companion that will bring warmth and love to anyone.",
        price: 50,
        image: [redTeddyBear],
        category: ["add-ons", "teddy-bear"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 22,
        name: 'birthday Topper',
        description: "The Birthday Topper is a festive decoration that will make any birthday celebration extra special.",
        price: 25,
        image: [birthdayTopper],
        category: ["add-ons", "topper"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 23,
        name: 'fathers Day Topper',
        description: "The Father's Day Topper is a thoughtful decoration that will show your dad how much you care.",
        price: 25,
        image: [fathersDayTopper],
        category: ["add-ons", "topper"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 24,
        name: 'get Well Soon Topper',
        description: "The Get Well Soon Topper is a cheerful decoration that will brighten anyone's day.",
        price: 25,
        image: [getWellSoonTopper],
        category: ["add-ons", "topper"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 25,
        name: 'i Love You Topper',
        description: "The I Love You Topper is a romantic decoration that will express your love perfectly.",
        price: 25,
        image: [iLoveYouTopper],
        category: ["add-ons", "topper"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 26,
        name: 'mothers Day Topper',
        description: "The Mother's Day Topper is a loving decoration that will show your mom how much you care.",
        price: 25,
        image: [mothersDayTopper],
        category: ["add-ons", "topper"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 27,
        name: 'baby Penguin Toy',
        description: "The Baby Penguin Toy is an adorable companion that will bring joy to any child.",
        price: 50,
        image: [babyPenguinToy],
        category: ["add-ons", "toys"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 28,
        name: 'baby Rabbit Toy',
        description: "The Baby Rabbit Toy is a cuddly companion that will bring comfort and joy to any child.",
        price: 50,
        image: [babyRabbitToy],
        category: ["add-ons", "toys"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 29,
        name: 'elephant Collction Toy',
        description: "The Elephant Collection Toy is a charming companion that will bring warmth and love to any child.",
        price: 50,
        image: [elephantCollctionToy],
        category: ["add-ons", "toys"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 30,
        name: 'ceramic Vase',
        description: "The Ceramic Vase is a stylish and elegant container that will complement any bouquet.",
        price: 50,
        image: [ceramicVase],
        category: ["add-ons", "vase"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 31,
        name: 'transparent Vase',
        description: "The Transparent Vase is a modern and sleek container that will showcase any bouquet beautifully.",
        price: 50,
        image: [transparentVase],
        category: ["add-ons", "vase"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 32,
        name: 'cylindrical Vase',
        description: "The Cylindrical Vase is a classic and versatile container that will enhance any bouquet.",
        price: 50,
        image: [cylindricalVase],
        category: ["add-ons", "vase"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 33,
        name: 'birthday Baloon',
        description: "The Birthday Balloon is a festive decoration that will make any birthday celebration extra special.",
        price: 25,
        image: [birthdayBaloon],
        category: ["add-ons", "baloon"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 34,
        name: 'fathers Day Baloon',
        description: "The Father's Day Balloon is a thoughtful decoration that will show your dad how much you care.",
        price: 25,
        image: [fathersDayBaloon],
        category: ["add-ons", "baloon"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 35,
        name: 'mothers Day Baloon',
        description: "The Mother's Day Balloon is a loving decoration that will show your mom how much you care.",
        price: 25,
        image: [mothersDayBaloon],
        category: ["add-ons", "baloon"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 36,
        name: 'new Year Baloon',
        description: "The New Year Balloon is a festive decoration that will ring in the new year with style.",
        price: 25,
        image: [newYearBaloon],
        category: ["add-ons", "baloon"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
    {
        _id: 37,
        name: 'christmas Baloon',
        description: "The Christmas Balloon is a festive decoration that will spread holiday cheer.",
        price: 25,
        image: [christmasBaloon],
        category: ["add-ons", "baloon"],
        sizes: ['small', 'medium', 'large'],
        date: '1234557',
        bestseller: true
    },
];

export const collectionImages = [
    {
        type: 'bouquets',
        image: 'delightful',
        link: '/collection/bouquets'
    },
    {
        type: 'boxes-baskets',
        image: 'angelic',
        link: '/collection/boxes-baskets'
    },
    {
        type: 'dried-flowers',
        image: 'millionStars',
        link: '/collection/dried-flowers'
    },
    {
        type: 'forever-roses',
        image: 'foreverRose',
        link: '/collection/forever-roses'
    },
    {
        type: 'roses',
        image: 'beMyLady',
        link: '/collection/roses'
    },
    {
        type: 'lilies',
        image: "you'reAStar",
        link: '/collection/lilies'
    }
];

export const occasionImages = [
    {
        type: "valentine's-day",
        image: 'passionOfLove',
        link: "/occasion/valentine's-day"
    },
    {
        type: "eid",
        image: 'adorable',
        link: '/occasion/eid'
    },
    {
        type: "anniversary",
        image: 'iLoveYou',
        link: '/occasion/anniversary'
    },
    {
        type: "christmas",
        image: 'simplyDelightful',
        link: '/occasion/christmas'
    },
    {
        type: "congratulation",
        image: "you'reAStar",
        link: '/occasion/congratulation'
    },
    {
        type: "new-born-baby",
        image: 'babyPink',
        link: '/occasion/new-born-baby'
    }
];