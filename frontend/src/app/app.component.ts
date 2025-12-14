import { Component } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    template: `
        <nav class="navbar">
            <div class="container">
                <h1 class="logo">Restaurant & Café</h1>
                <ul class="nav-links">
                    <li>
                        <a routerLink="/menu" routerLinkActive="active">Menu</a>
                    </li>
                    <li>
                        <a routerLink="/create-order" routerLinkActive="active"
                            >Create Order</a
                        >
                    </li>
                    <li>
                        <a routerLink="/orders" routerLinkActive="active"
                            >Orders</a
                        >
                    </li>
                </ul>
            </div>
        </nav>
        <main>
            <router-outlet></router-outlet>
        </main>
    `,
    styles: [
        `
            .navbar {
                background-color: #2c3e50;
                color: white;
                padding: 15px 0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .navbar .container {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .logo {
                margin: 0;
                font-size: 24px;
            }

            .nav-links {
                display: flex;
                list-style: none;
                gap: 20px;
            }

            .nav-links a {
                color: white;
                text-decoration: none;
                padding: 8px 16px;
                border-radius: 4px;
                transition: background-color 0.3s;
            }

            .nav-links a:hover,
            .nav-links a.active {
                background-color: #34495e;
            }

            main {
                min-height: calc(100vh - 70px);
            }
        `,
    ],
})
export class AppComponent {
    title = "Restaurant Cafe System";
}
