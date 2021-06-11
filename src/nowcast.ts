import axios from 'axios';

type Time = {
    basetime: string;
    validtime: string;
    elements: string[];
};

type TimeData = {
    now: Time;
    past: Time[];
    forecast: Time[];
};

export const getTimeData = async (): Promise<TimeData> => {
    const [res1, res2] = await Promise.all([
        axios({
            method: 'GET',
            url: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json',
        }),
        axios({
            method: 'GET',
            url: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N2.json',
        }),
    ]);
    const [n1, n2]: [Time[], Time[]] = [res1.data, res2.data];
    const sortFunction = (a: Time, b: Time) => {
        if (a.validtime < b.validtime) return -1;
        if (a.validtime > b.validtime) return 1;
        return 0;
    };
    n1.sort(sortFunction);
    n2.sort(sortFunction);

    return {
        now: n1.pop()!,
        past: n1,
        forecast: n2,
    };
};

type TileUrlData = {
    now: string;
    past: string[];
    forecast: string[];
};

export const getXyzTileUrlData = (timeData: TimeData): TileUrlData => {
    const replacer = (time: Time): string => {
        return 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{basetime}/none/{validtime}/surf/hrpns/{z}/{x}/{y}.png'
            .replace('{basetime}', time.basetime)
            .replace('{validtime}', time.validtime);
    };
    const tileData = {
        now: replacer(timeData.now),
        past: timeData.past.map((time) => replacer(time)),
        forecast: timeData.forecast.map((time) => replacer(time)),
    };
    return tileData;
};
