import { describe, expect, test } from 'vitest';
import { formatPrice } from '../../src/utils/format';

describe('formatPrice', () => {
	test('Should format with two decimals and currency', () => {
		expect(formatPrice(19.9, 'EUR')).eq('19.90 EUR');
	});
});
