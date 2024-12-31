<div class="dropdown">
      <button
        class="btn dropdown-toggle d-flex align-items-center hidden-arrow"
        type="button"
        id="navbarDropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
    <img
      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
      class="rounded-circle"
      height="25"
      alt="Black and White Portrait of a Man"
      loading="lazy"
    />
    </button>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
        <li><a class="dropdown-item" href="#">My profile</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><Link class="dropdown-item" onClick={logout}>Logout</Link></li>
      </ul>
      <a href="#" className="profile">
        <FaUser style={{ color: '#896432' }} /> {/* Icône de profil */}
      </a>
      </div>
       