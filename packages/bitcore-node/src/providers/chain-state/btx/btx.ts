import { CacheStorage } from '../../../models/cache';
import { GetEstimateSmartFeeParams } from '../../../types/namespaces/ChainStateProvider';
import { BTCStateProvider } from '../btc/btc';

export class BTXStateProvider extends BTCStateProvider {
  constructor(chain: string = 'BTX') {
    super(chain);
  }

  async getFee(params: GetEstimateSmartFeeParams) {
    const { chain, network } = params;
    const cacheKey = `getFee-${chain}-${network}`;
    return CacheStorage.getGlobalOrRefresh(
      cacheKey,
      async () => {
        return { feerate: await this.getRPC(chain, network).getEstimateFee() };
      },
      30 * CacheStorage.Times.Minute
    );
  }
}
