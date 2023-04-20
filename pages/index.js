import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Hero from '@/components/Hero'
import HomeWrapper from '@/components/HomeWrapper'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Hero />
      <HomeWrapper>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Latest
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags, author, category } = frontMatter
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="flex items-center justify-between text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          {/* <span className="text-signature px-2.5 py-0.5 rounded-full dark:text-signature border border-signature mt-2">Azure security</span> 
                        <div className="overflow-hidden p-0.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                          <span className="text-signature px-2.5 py-0.5 rounded-full bg-white dark:bg-gray-900">Azure security</span>
                         </div> */}
                          <span className="gradient-border-bg-white dark:gradient-border-bg-dark text-sm font-semibold text-signature">
                            {category}
                          </span>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="flex items-center text-base font-semibold leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="mr-2 text-gray-900 dark:text-gray-100"
                            aria-label={`Read "${title}"`}
                          >
                            {author}
                          </Link>
                          <time className="text-gray-500 dark:text-gray-400" dateTime={date}>
                            {formatDate(date)}
                          </time>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200"
              aria-label="all posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter.provider !== '' && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )}
      </HomeWrapper>
    </>
  )
}
