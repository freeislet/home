import { redirect } from 'next/navigation'
import Image from 'next/image'

import { getPageSession } from '@/auth/lucia'
import { productsRepository } from '@/repository/products'
import Form from '@/components/form'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const session = await getPageSession()
  if (!session) redirect('/login')

  const products = await productsRepository.all()

  return (
    <div className="container">
      <div>
        <h1>Profile</h1>
        <p>User id: {session.user.userId}</p>
        <p>Username: {session.user.githubUsername}</p>
        <Form action="/api/logout">
          <input type="submit" value="Sign out" />
        </Form>
      </div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.id}: {product.name} (category: {product.category_id})
          </li>
        ))}
      </ul>
      <Button>Click me</Button>
    </div>
  )
}
