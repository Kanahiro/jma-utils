import { getXyzTileUrlData } from '../src/nowcast';
import { timeData } from './fixture';

describe('nowcast', () => {
    test('getXyzTileUrls', () => {
        const tileUrlData = getXyzTileUrlData(timeData);
        expect(typeof tileUrlData.now === 'string').toBeTruthy();
        expect(tileUrlData.past.length >= 0).toBeTruthy();
        expect(tileUrlData.forecast.length >= 0).toBeTruthy();
    });
});
