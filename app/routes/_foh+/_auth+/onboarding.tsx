import { Button } from '#app/components/(ui)/button';
import { Input } from '#app/components/(ui)/input';
import { Label } from '#app/components/(ui)/label';
import { TextField } from '#app/components/(ui)/textfield';

export default function OnboardingRoute() {
  return (
    <div className="pt-24 sm:pt-6 md:pt-16">
      <div className="sm:bg-panel max-w-2xl sm:mx-auto sm:rounded-xl sm:px-12 py-4">
        <header className="sm:border-b border-cn pb-4">
          <h2 className="text-xl text-center text-subtle font-semibold ">
            Code Eingabe
          </h2>
        </header>
        <section className="p-4 mt-4 gap-y-8 flex flex-col items-center mx-2 sm:mx-8">
          <TextField className="flex justify-center">
            <Label className="sr-only">Code</Label>
            <Input className="text-4xl w-40 py-8" autoFocus />
          </TextField>
          <Button variant="primary">Anmelden</Button>
        </section>
      </div>
    </div>
  );
}
