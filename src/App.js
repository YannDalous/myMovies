import React, { Component } from 'react';
import {Popover,PopoverHeader, PopoverBody, Container, Row, Col, Card, Button, Nav, NavItem, NavLink, CardImg, CardTitle, CardText, CardBody} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faHeart } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }





  render() {

    var moviesData = [
      {
        name: "L'Odyssée de Pi",
        desc: "Après que leur bateau est victime d'une violente tempête etcoule au fond du Pacifique, un adolescent et un tigre du Bengale...",
        img: "/pi.jpg"
      },
      {
        name: "Maléfique",
        desc: "Poussée par la vengeance et une volonté farouche deprotéger les terres qu'elle préside, Maléfique place ...",
        img: "/malefique.jpg"
      },
      {
        name: "Les Aventures de Tintin",
        desc: "Parce qu'il achète la maquette d'un bateau appelé laLicorne, Tintin, un jeune reporter, se retrouve entraîné dans unefantastique aventure...",
        img: "/tintin.jpg"
      }
    ];

    var moviesList = moviesData.map(function(movie){
        return <Movie movieName={movie.name}
                      movieDesc={movie.desc}
                      movieImg={movie.img} />
      }
    );

  var moviesNameList = ["L'Odyssée de Pi","Maléfique","Les Aventures de Tintin"];


  var moviesCount = moviesNameList.length;

  var moviesNameLast;
switch (moviesCount) {
  case 0:
    moviesNameLast = "aucun film sélectionné";
    break;
  case 1:
    moviesNameLast = moviesNameList;
    break;
  case 2:
    moviesNameLast = moviesNameList[0] + ", " + moviesNameList[1];
    break;
  default:
  moviesNameLast = moviesNameList[moviesCount-3] + ", ";
    for (var i=moviesCount-2; i<moviesCount; i++) {
      moviesNameLast = moviesNameLast + moviesNameList[i] + ", ";
    }
    moviesNameLast = moviesNameLast + "...";

}/*
  if (moviesCount === 0) {
        moviesNameLast = "aucun film sélectionné";
  } else if (moviesCount === 1) {
    moviesNameLast = moviesNameList;
  } else if (moviesCount === 2)  {
        moviesNameLast = moviesNameList[0] + ", " + moviesNameList[1];
        for (var i=1; i<moviesCount; i++) {
      moviesNameLast = moviesNameLast + moviesNameList[i] + ", ";
    }
      if (moviesCount === 2) {
        moviesNameLast = moviesNameLast.substring(0, moviesNameLast.length - 2);
      } else {
        moviesNameLast = moviesNameLast + "...";
      }
  }*/



    return (
      <Container style={{backgroundColor:'#000000'}}>
        <Row>
          <Col>
            <Nav style={{marginBottom:'100px'}}>
              <NavItem>
                <NavLink href="#"><img src="logo.png"/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color:'#FFFFFF'}}  href="#"> Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color:'#FFFFFF'}}  href="#">My movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <Button id="Popover1" onClick={this.toggle}>
                    {moviesCount} films
                  </Button>
                  <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                    <PopoverHeader>Derniers films ajoutés</PopoverHeader>
                    <PopoverBody>{moviesNameLast}</PopoverBody>
                  </Popover>
                </NavLink>
              </NavItem>
            </Nav>


          </Col>

        </Row>
        <Row>

{moviesList}

        </Row>
      </Container>
    )
  }
}

class Movie extends Component {

  render() {

    var heart = {
      position: "absolute",
      top: "15px",
      right: "15px",
      color: "red",
      height: "25px",
      width: "25px"
    }
    var card = {
      marginBottom:'5%',
      height: '95%'
    }

/*  style={{alignItems:'stretch'}}*/
    return(
      <Col xs="3">
        <Card style={card}>
          <CardImg top width="100%" src={this.props.movieImg} alt="Card image cap" />
          <FontAwesomeIcon style={heart} icon={faHeart} />
		  <CardBody>

            <CardTitle>{this.props.movieName}</CardTitle>
            <CardText>{this.props.movieDesc}</CardText>

          </CardBody>
        </Card>
      </Col>
    );

  }
}

export default App;
