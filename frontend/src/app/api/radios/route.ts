import { NextResponse } from "next/server";

export const GET = async () => {
  const radios = [
    {
      name: "Radio Avtoradio",
      url: "https://nue01-edge01.itdc.ge/fm-autoradio-95.1/mono.m3u8",
      logo: "/images/radios/avtoradio.png",
      language: "GE",
    },
    {
      name: "Radio Fortuna",
      url: "https://nue01-edge01.itdc.ge/fm-radiofortunaplus-103.4/mono.m3u8",
      logo: "/images/radios/radio-fortuna.png",
      language: "GE",
    },
    {
      name: "Radio Palitra",
      url: "https://radiostream.palitra.ge/stream.mp3",
      logo: "/images/radios/radio-palitra.jpg",
      language: "GE",
    },
    {
      name: "Radio Chveneburi",
      url: "https://radio.cdn.xsg.ge/cld9-1050/chveneburi/mono.m3u8",
      logo: "/images/radios/chveneburi.jpg",
      language: "GE",
    },
    {
      name: "Radio Positive",
      url: "https://stream.radiojar.com/sr4vzamzfnruv",
      logo: "/images/radios/radio-positive.jpg",
      language: "GE",
    },
    {
      name: "Radio Ajara",
      url: "https://radiostream.palitra.ge/stream.mp3",
      logo: "/images/radios/radio-ajara.jpg",
      language: "GE",
    },
    {
      name: "Radio Ar Daidardo",
      url: "https://tv.cdn.xsg.ge/cld9-0386/ardaidardo/mono.m3u8",
      logo: "/images/radios/radio-ardaidardo.jpeg",
      language: "GE",
    },
    {
      name: "Radio Batumi",
      url: "https://nue01-edge01.itdc.ge/fm-batumi-93.7/mono.m3u8",
      logo: "/images/radios/batumi.jpeg",
      language: "GE",
    },

    {
      name: "Radio Lazio",
      url: "http://icestreaming.rai.it/1.mp3.m3u",
      logo: "/images/radios/radio-lazio.webp",
      language: "ITA",
    },
    {
      name: "Radio Rome",
      url: "https://bay1.streamfm.it:8040/aacp",
      logo: "/images/radios/radio-roma.png",
      language: "ITA",
    },
    {
      name: "Radio Italia",
      url: "http://icestreaming.rai.it/2.mp3.m3u",
      logo: "/images/radios/radio-italia.png",
      language: "ITA",
    },
    {
      name: "Radio Milani",
      url: "https://streamcdnb1-4c4b867c89244861ac216426883d1ad0.msvdn.net/radiodeejay/radiodeejay/play1.m3u8",
      logo: "/images/radios/radio-milani.jpg",
      language: "ITA",
    },
    {
      name: "Radio Mambo",
      url: "https://mambo.newradio.it/stream",
      logo: "/images/radios/radio-mambo.png",
      language: "ITA",
    },
    {
      name: "Radio Antenna",
      url: "https://a1-it.newradio.it/stream",
      logo: "/images/radios/radio-antenna.png",
      language: "ITA",
    },

    {
      name: "Radio Chante-France",
      url: "https://streaming.nrjaudio.fm/ouuku85n3nje?origine=RadiomapEu",
      logo: "/images/radios/radio-chante.png",
      language: "FRA",
    },
    {
      name: "Radio France",
      url: "http://icecast.radiofrance.fr/mouv-midfi.mp3",
      logo: "/images/radios/radio-france.webp",
      language: "FRA",
    },
    {
      name: "Radio Paris",
      url: "http://www.radioking.com/play/tropiques-fm",
      logo: "/images/radios/radio-paris.png",
      language: "FRA",
    },
    {
      name: "Radio Skyrock",
      url: "https://icecast.skyrock.net/s/natio_aac_128k",
      logo: "/images/radios/radio-skyrock.png",
      language: "FRA",
    },
    {
      name: "Radio Latina - France",
      url: "https://start-latina.ice.infomaniak.ch/start-latina-high.aac",
      logo: "/images/radios/radio-latina.jpeg",
      language: "FRA",
    },
  ];

  return NextResponse.json(radios);
};
