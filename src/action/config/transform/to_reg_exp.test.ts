import { assertEquals } from '@std/assert/equals';
import { toRegExp } from './to_reg_exp.ts';

Deno.test('Tests the toRegExp function.', async (test) => {
  await test.step({
    name: 'Tests if the function returns undefined on empty input.',
    fn: () => {
      assertEquals(toRegExp(''), undefined);
    }
  })

  await test.step({
    name: 'Tests if the function returns undefined on undefined input.',
    fn: () => {
      assertEquals(toRegExp(undefined), undefined);
    }
  })
})
