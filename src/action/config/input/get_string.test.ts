import { assertEquals } from '@std/assert/equals';
import { getString } from './get_string.ts';

const testData : Record<string, string> = {
  foo: 'bar'
}
Deno.test('Tests the getString function.', async (test) => {
  await test.step({
    name: 'Tests if the function gets the correct string.',
    fn: () => {
      assertEquals(getString('foo', (key) => testData[key]), 'bar');
    }
  })
})
