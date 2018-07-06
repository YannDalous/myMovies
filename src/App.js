import React, { Component } from 'react';
import {Popover,PopoverHeader, PopoverBody, Container, Row, Col, Card, Button, Nav, NavItem, NavLink, CardImg, CardTitle, CardText, CardBody} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      popoverOpen: false,
      viewOnlyLike: false,
      moviesCount: 0,
      moviesNameList: []
    };
  }

  toggle() {
    this.setState({popoverOpen: !this.state.popoverOpen});
  }

  handleClickLikeOff() {
    this.setState({viewOnlyLike: false});
  }
  handleClickLikeOn() {
    this.setState({viewOnlyLike: true});
  }

  handleClick(isLike, name){
    if (isLike){
      this.setState({moviesCount: this.state.moviesCount - 1});
      var moviesNameList = [...this.state.moviesNameList];
      moviesNameList.splice((moviesNameList.indexOf(name)),1);
      this.setState({moviesNameList: moviesNameList})
    } else {
      this.setState({moviesCount: this.state.moviesCount + 1});
      var moviesNameList = [...this.state.moviesNameList];
      moviesNameList.push(name);
      this.setState({moviesNameList: moviesNameList})
    }
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

    var  moviesList = moviesData.map(movie => {
          return <Movie movieName={movie.name}
                        movieDesc={movie.desc}
                        movieImg={movie.img}
                        displayOnlyLike= {this.state.viewOnlyLike}
                        handleClickParent= {this.handleClick} />;
                      });

    //var moviesNameList = ["L'Odyssée de Pi","Maléfique","Les Aventures de Tintin"];
    var moviesCount = this.state.moviesNameList.length;
    var moviesNameLast;

    switch (moviesCount) {
      case 0:
        moviesNameLast = "aucun film sélectionné";
        break;
      case 1:
        moviesNameLast = this.state.moviesNameList;
        break;
      case 2:
        moviesNameLast = this.state.moviesNameList[0] + ", " + this.state.moviesNameList[1];
        break;
      default:
      moviesNameLast =this.state. moviesNameList[moviesCount-3] + ", ";
        for (var i=moviesCount-2; i<moviesCount; i++) {
          moviesNameLast = moviesNameLast + this.state.moviesNameList[i] + ", ";
        }
        moviesNameLast = moviesNameLast + "...";
    }

    return (
      <Container style={{backgroundColor:'#000000'}}>
        <Row>
          <Col>
            <Nav style={{marginBottom:'100px'}}>
              <NavItem>
                <NavLink href="#"><img src="logo.png"/></NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.handleClickLikeOff} style={{color:'#FFFFFF'}}  href="#">Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.handleClickLikeOn} style={{color:'#FFFFFF'}}  href="#">My movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <Button id="Popover1" onClick={this.toggle}>
                    {this.state.moviesCount} films
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

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {like: false}
  }

  handleClick() {
    if (this.state.like) {
      this.setState({like: false});
      this.props.handleClickParent(this.state.like, this.props.movieName);
  } else {
    this.setState({like: true});
    this.props.handleClickParent(this.state.like, this.props.movieName);
  }
}

  render() {

    var heart;
    if (this.state.like){
      //position: "absolute",
    heart = {top: "15px",
      right: "15px",
      height: "25px",
      width: "25px",
      color: "#FF5B53"};
    } else {
      heart = {
      top: "15px",
      right: "15px",
      height: "25px",
      width: "25px"};
    }

    var card = {
      marginBottom:'5%',
      height: '95%'
    }
//37893587 - 38810671
    var movieDisplay;
    if (this.props.displayOnlyLike && !this.state.like) {
      movieDisplay = {display: 'none'};
    }

    return(
      <Col style={movieDisplay} xs="3">
        <Card style={card}>
          <CardImg top width="100%" src={this.props.movieImg} alt="Card image cap" />
    		  <CardBody>
            <FontAwesomeIcon onClick={this.handleClick} style={heart} icon={faHeart} />
            <CardTitle>{this.props.movieName}</CardTitle>
            <CardText>{this.props.movieDesc}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default App;
