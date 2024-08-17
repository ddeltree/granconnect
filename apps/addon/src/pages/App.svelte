<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, db } from '../firebase';
  import { setDoc, doc, getDoc } from 'firebase/firestore';
  import { ForbiddenError, fetchAuthorizedSession } from '../../lib/session';

  let name = '';
  let email = '';
  let hasAccess: boolean | undefined = undefined;
  $: disabled = !name || !email;
  $: user = auth.currentUser;

  onMount(() => {
    auth.onAuthStateChanged(async (u) => {
      user = u;
      if (user) {
        try {
          await fetchAuthorizedSession();
          hasAccess = true;
        } catch (e) {
          if (!(e instanceof ForbiddenError)) throw e;
          hasAccess = false;
        }
        console.log(user.uid, user.getIdToken());
        const documento = await getDoc(doc(db, 'users', user.uid));
        if (documento.exists()) {
          const data = documento.data();
          name = data.name ?? '';
          email = data.email ?? '';
        }
      }
    });
  });
</script>

<main
  class="flex flex-col text-sm h-full items-center justify-center w-96 mx-auto"
>
  <h1 class="font-bold text-3xl pb-12">Informar nome e email</h1>
  <form
    class="gap-y-5 grid grid-cols-5 items-center [&>input]:col-span-4"
    on:submit={(e) => {
      e.preventDefault();
      if (!user) {
        alert('Erro inesperado: usuário inexistente');
        return;
      }
      setDoc(doc(db, 'users', user.uid), { name, email });
    }}
  >
    <label for="nome">Nome: </label>
    <input type="text" id="name" bind:value={name} placeholder="Seu nome" />
    <label for="nome">Email: </label>
    <input type="email" bind:value={email} placeholder="nome@exemplo.com" />
    <button type="submit" class="col-span-5 ml-[60px] bg-white" {disabled}
      >{disabled ? '...' : 'Atualizar'}</button
    >
  </form>
  <p class="absolute bottom-0 mb-8">
    Acesso: <span class={`font-semibold ${hasAccess && 'text-green-500'}`}
      >{hasAccess === undefined ? '...' : hasAccess ? 'sim' : 'não'}</span
    >
  </p>
</main>
