import React from 'react'
import PropTypes from 'prop-types'
import { Link} from 'react-router-dom'

const ProfileItem = ({
    profile:{
    user: {_id, name, avatar},
    status,
    company,
    location,
    skills//it s an array hit kna drna lih split hit kidkhl ghir php, c, java so drnah f array li endo index
    }
}) => {
    return (
        <div className="profile bg-light">
           <img
            className="round-img"
            src={avatar}
            alt="Loading..."
          />
           <div>
            <h2>{name}</h2>
            <p>{status} {company && <span>{' at '+ company}</span>}</p>
            <p className="my-2">{location && <span>{location}</span>}</p>
            <Link to={"/profile/"+ _id} className="btn btn-primary">View Profile</Link>
          </div>
          <ul>
              {skills.slice(0, 4/* shows just 4 skills cause bghina lakhrin htl profile dialo*/).map((skill, index) => (
                  
                <li class="text-primary" key={index}>{/*drna index d array skills f key hit unique */}
                <i class="fas fa-check"></i> {skill} {/*it s an array hit kna drna lih split hit kidkhl ghir php, c, java so drnah f array li endo index*/}
                </li>
              ))}
           
        </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
