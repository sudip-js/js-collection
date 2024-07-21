import React from 'react'

const Footer = () => {
    return (
        <footer class="bg-card text-card-foreground border-t border-border py-4">
            <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p class="text-muted-foreground text-sm">© 2020 Your Company, Inc. All rights reserved.</p>
                <div class="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" class="text-muted-foreground hover:text-primary">
                        <img aria-hidden="true" alt="facebook" src="https://openui.fly.dev/openui/24x24.svg?text=📘" />
                    </a>
                    <a href="#" class="text-muted-foreground hover:text-primary">
                        <img aria-hidden="true" alt="instagram" src="https://openui.fly.dev/openui/24x24.svg?text=📸" />
                    </a>
                    <a href="#" class="text-muted-foreground hover:text-primary">
                        <img aria-hidden="true" alt="twitter" src="https://openui.fly.dev/openui/24x24.svg?text=🐦" />
                    </a>
                    <a href="#" class="text-muted-foreground hover:text-primary">
                        <img aria-hidden="true" alt="github" src="https://openui.fly.dev/openui/24x24.svg?text=🐙" />
                    </a>
                    <a href="#" class="text-muted-foreground hover:text-primary">
                        <img aria-hidden="true" alt="youtube" src="https://openui.fly.dev/openui/24x24.svg?text=▶️" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer