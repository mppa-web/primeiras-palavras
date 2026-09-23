# Site público (privacidade, termos, exclusão de conta)

A Play Store e a verificação do Google exigem essas páginas em uma URL pública.

## 1. Preencha seus dados
Abra `site.js` e troque as duas linhas do topo:
```js
owner: 'Seu Nome Completo',
email: 'contato@seudominio.com',
```
É o único arquivo a editar: todas as páginas leem dali.

## 2. Publique no GitHub Pages (grátis)
1. Crie um repositório público em github.com chamado `primeiras-palavras`.
2. **Add file › Upload files** e envie os 6 arquivos desta pasta, na raiz do repositório.
3. **Settings › Pages** › Source: *Deploy from a branch* › Branch: `main` / `(root)` › Save.
4. Em 1–2 minutos o site sai em `https://SEU-USUARIO.github.io/primeiras-palavras/`.

## 3. Aponte o app para o site
Em `expo/src/config.js`:
```js
export const SITE_URL = 'https://SEU-USUARIO.github.io/primeiras-palavras';
```

## 4. Onde colar cada link
| Onde | Link |
|---|---|
| Play Console › Política do app › Política de privacidade | `.../privacidade.html` |
| Play Console › Segurança dos dados › Exclusão de conta | `.../excluir-conta.html` |
| Google Cloud › Tela de consentimento OAuth › Página inicial | `.../` |
| Google Cloud › Tela de consentimento OAuth › Política de privacidade | `.../privacidade.html` |
| Google Cloud › Tela de consentimento OAuth › Termos de serviço | `.../termos.html` |

**Verificação do OAuth:** o Google pede que o domínio da página inicial seja
verificado no Search Console. Com `github.io` isso funciona, mas um domínio
próprio (ex.: `primeiraspalavras.app`, ~R$ 60/ano) passa mais fácil na revisão
e dá para apontar para o mesmo GitHub Pages em Settings › Pages › Custom domain.

Cada página tem português e inglês; `?lang=en` abre direto em inglês.
