import { assertEquals } from '@std/assert/equals';
import { toString } from './to_string.ts';

Deno.test('Tests the toString function.', async (test) => {
  await test.step({
    name: 'Tests if the function returns the correct string.',
    fn: () => {
      assertEquals(toString('foo'), 'foo');
    }
  })

  await test.step({
    name: 'Tests if the function returns undefined on empty input.',
    fn: () => {
      assertEquals(toString(''), undefined);
    }
  })

  await test.step({
    name: 'Tests if the function returns undefined on undefined input.',
    fn: () => {
      assertEquals(toString(undefined), undefined);
    }
  })
})
