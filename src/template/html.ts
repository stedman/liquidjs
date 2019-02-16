import Template from 'src/template/template'
import Scope from 'src/scope/scope'
import ITemplate from 'src/template/itemplate'
import Token from 'src/parser/token'

export default class extends Template implements ITemplate {
  str: string
  constructor(token: Token) {
    super(token)
    this.str = token.value
  }
  async render(scope: Scope): Promise<string> {
    return this.str
  }
}
