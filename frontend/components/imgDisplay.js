import { html, define } from 'hybrids'

export const imgDisplay = {
  render: () => html`
    <section class="img-display">
      <h2>img shows here</h2>
    </section>
  `
}

define('img-display', imgDisplay)
