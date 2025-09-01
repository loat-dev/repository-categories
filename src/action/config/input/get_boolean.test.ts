import { assertEquals } from '@std/assert/equals';
import { getBoolean } from './get_boolean.ts';

const testData : Record<string, boolean> = {
  true: true,
  True: true,
  TRUE: true,
  yes: true,
  Yes: true,
  YES: true,
  foo: false
}
Deno.test('Tests the getBoolean function.', async (test) => {
  for (const [key, value] of Object.entries(testData)) {
    await test.step({
      name: `Tests if the function gets the correct boolean (${key}).`,
      fn: () => {
        assertEquals(getBoolean(key, (key) => key), value);
      }
    }) 
  }

  await test.step({
    name: 'Tests if the function returns undefined on empty input.',
    fn: () => {
      assertEquals(getBoolean('foo', () => ''), undefined);
    }
  })
})
